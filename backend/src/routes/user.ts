import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    const body = await c.req.json();
    // const { success } = signupInput.safeParse(body);
    // if (!success) {
    //     c.status(411);
    //     return c.json({
    //         message: "Inputs not correct"
    //     })
    // }
  
    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.text(jwt)
    } catch(e) {
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })
  
  
  userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body:{email:string,password:string} = await c.req.json();
    // const body = await c.req.json();
	  // const { success } = signinInput.safeParse(body);
	  // if (!success) {
		//   c.status(400);
		//   return c.json({ error: "invalid input" });
	  // }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        }
      })
      if(user?.password === body.password) {
        const jwt = await sign({id:user.id}, '123456789')
        return c.json({jwt})
      }
    } catch (error) {
      return c.status(403);
    }
  
  })