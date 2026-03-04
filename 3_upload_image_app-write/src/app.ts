import fastify from 'fastify';
import { uploadRoutes } from './routes/uploadRoutes';
import multipart from '@fastify/multipart'

export const app = fastify();
app.register(multipart)
app.register(uploadRoutes);
