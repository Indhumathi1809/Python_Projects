// pages/api/attendance.js

import { getSession } from 'next-auth/react';
import { connectDB } from '../../utils/db';
import Attendance from '../../models/Attendance';

connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Create a new attendance record
    const attendance = new Attendance({ userId: session.user.id });
    await attendance.save();

    res.status(200).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
}
