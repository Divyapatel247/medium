import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// url      = "postgresql://medivyapatel27:ia6xVfKq9lMY@ep-old-darkness-08195857.us-east-2.aws.neon.tech/test?sslmode=require"
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMGJmMGJhNDYtYTJhZi00OGJkLTk4NGItOWJhZGVmMWVlNmFjIiwidGVuYW50X2lkIjoiN2QyNmM0YTgzODBkNzYxOWE0NTA4NGY0NjhjNTgwMTdjNzBhODExYWNiNGI1MGM3NmJiMTdjZGI5OTBhNTA4OCIsImludGVybmFsX3NlY3JldCI6IjcwZTIxZDFmLTVjMjctNGIzZS05NmQzLTNlYmRhYTg1YWY1OSJ9.g0tfwOnIPw8-DQLTe4IatBsYUBecUj6ROU3tve7mwIQ"

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
