import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';


// const prisma = new PrismaClient({
//     datasourceUrl:"postgresql://medivyapatel27:ia6xVfKq9lMY@ep-old-darkness-08195857.us-east-2.aws.neon.tech/test?sslmode=require" ,
// }).$extends(withAccelerate())

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

// url      = "postgresql://medivyapatel27:ia6xVfKq9lMY@ep-old-darkness-08195857.us-east-2.aws.neon.tech/test?sslmode=require"
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMGJmMGJhNDYtYTJhZi00OGJkLTk4NGItOWJhZGVmMWVlNmFjIiwidGVuYW50X2lkIjoiN2QyNmM0YTgzODBkNzYxOWE0NTA4NGY0NjhjNTgwMTdjNzBhODExYWNiNGI1MGM3NmJiMTdjZGI5OTBhNTA4OCIsImludGVybmFsX3NlY3JldCI6IjcwZTIxZDFmLTVjMjctNGIzZS05NmQzLTNlYmRhYTg1YWY1OSJ9.g0tfwOnIPw8-DQLTe4IatBsYUBecUj6ROU3tve7mwIQ"

app.post('/api/v1/user/signup', async(c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  const body: {
    name: string;
    email: string;
    password: string
  } = await c.req.json()
	try {
		const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
      }
    })
    const jwt = await sign({id:user.id},c.env.JWT_SECRET)
	
		return c.text(jwt)
	} catch(e) {
		return c.status(403);
	}
})

app.post('/api/v1/user/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body:{email:string,password:string} = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    })
    if(user?.password === body.password) {
      const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
      return c.json(jwt)
    }
  } catch (error) {
    return c.status(403);
  }

})

app.post('/api/v1/blog', (c) => {
  return c.text('blog route')
})
app.put('/api/v1/blog', (c) => {
 return c.text('blog route to update')
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('get bulk blog')
})


export default app
