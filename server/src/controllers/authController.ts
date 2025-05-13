import { Request, Response } from 'express';
import db from '../config/db';
import { TAuthRequest } from '../types';
import bcrypt from 'bcrypt';

export async function signup(req: Request, res: Response) {
	const data: TAuthRequest = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.password, salt);

		await db.query('BEGIN');

		const result = await db.query(
			'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id_client',
			[data.username, hash]
		);

		await db.query('COMMIT');

		res.status(200).json({ id_client: result.rows[0].id_client, success: true, error: '' });
	} catch (err: any) {
		if (
			err.message ===
			'повторяющееся значение ключа нарушает ограничение уникальности "users_username_key"'
		)
			res.status(403).json({ success: false, error: 'Пользователь с таким именем уже есть' });
	}
}

export async function signin(req: Request, res: Response) {
	const data: TAuthRequest = req.body;

	try {
		await db.query('BEGIN');

		const result = await db.query(
			'SELECT id_client, password_hash FROM users WHERE username = $1',
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
			res.status(200).json({
				id_client: result.rows[0].id_client,
				success: true,
				error: '',
			});
		} else {
			res.status(403).json({ success: false, error: 'Неверный пароль' });
		}
	} catch (err: any) {
		console.log(err.message);
	}
}
