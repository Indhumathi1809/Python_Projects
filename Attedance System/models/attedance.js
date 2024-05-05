// models/Attendance.js

import mongoose from 'mongoose';
import { AttendanceSchema } from '../utils/db';

const Attendance = mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
