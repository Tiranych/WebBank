import { NextFunction, Request, Response } from 'express';
import db from '../config/db';
import { TAuthRequest } from '../types';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
	token: string | JwtPayload;
	body: {
		is_admin: boolean;
	};
}

interface TokenPayload {
	id: number;
	name: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		const JWT_SECRET = process.env.JWT_SECRET || 'dvfbir';

		if (!token) {
			return res.status(401).json({ success: false, error: 'Не авторизован' });
		}

		const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

		(req as CustomRequest).token = decoded;

		if (
			decoded.name === process.env.ADMIN_NAME &&
			decoded.id === Number(process.env.ADMIN_ID)
		) {
			(req as CustomRequest).body.is_admin = true;
		} else {
			(req as CustomRequest).body.is_admin = false;
		}

		next();
	} catch (err) {
		res.status(401).json({
			success: false,
			error: 'Неверный или пустой токен',
		});
	}
};

export async function signup(req: Request, res: Response) {
	const data: TAuthRequest = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.password, salt);

		await db.query('BEGIN');

		const result = await db.query(
			'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id_client, username',
			[data.username, hash]
		);

		await db.query('COMMIT');

		const token = jwt.sign(
			{ id: result.rows[0].id_client, name: result.rows[0].username },
			'dvfbir',
			{
				expiresIn: '2 days',
			}
		);

		res.status(200).json({
			id_client: result.rows[0].id_client,
			success: true,
			auth_token: token,
			error: '',
		});
	} catch (err: any) {
		if (
			err.message ===
			'повторяющееся значение ключа нарушает ограничение уникальности "users_username_key"'
		) {
			res.status(403).json({ success: false, error: 'Пользователь с таким именем уже есть' });
		}
		res.status(403).json({ success: false, error: err.message });
	}
}

export async function signin(req: Request, res: Response) {
	const data: TAuthRequest = req.body;

	try {
		await db.query('BEGIN');

		const result = await db.query(
			'SELECT id_client, username, password_hash FROM users WHERE username = $1',
			[data.username]
		);

		await db.query('COMMIT');

		if (result.rows.length === 0) {
			await db.query('ROLLBACK');
			return res.status(403).json({
				success: false,
				error: 'Пользователь не найден',
			});
		}

		const isMatch = await bcrypt.compare(data.password, result.rows[0].password_hash);

		if (isMatch) {
			const token = jwt.sign(
				{ id: result.rows[0].id_client, name: result.rows[0].username },
				'dvfbir',
				{
					expiresIn: '2 days',
				}
			);

			res.status(200).json({
				id_client: result.rows[0].id_client,
				success: true,
				auth_token: token,
				error: '',
			});
		} else {
			res.status(403).json({ success: false, error: 'Неверный пароль' });
		}
	} catch (err: any) {
		console.log(err.message);
	}
}

export async function check(req: Request, res: Response) {
	res.status(200).json({ success: req.body.is_admin });
}
