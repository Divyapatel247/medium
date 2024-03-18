import { createPostInput, updatePostInput } from "@divya247/medium-app";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { verify } from "hono/jwt";

  export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }, 
    Variables: {
        userId: string;
    }
}>(); 
  

  blogRouter.use('/*', async(c,next)=>{
       const authHeader = c.req.header("Authorization") || "";
    try {

        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
  })

  blogRouter.post('/', async (c) => {
    const userId = c.get('userId'); 
    const body = await c.req.json();
	  const { success } = createPostInput.safeParse(body);
	  if (!success) {
		  c.status(400);
		  return c.json({ error: "invalid input" });
	   }
    // const body:{title:string,content:string,published:boolean} = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())


    const post = await prisma.posts.create({
      data:{
         title: body.title,
         content: body.content,
         published:body.published,
         authorId: userId
      }
    })
    return c.json({id:post.id})
  })

  blogRouter.put('/', async(c) => {
    const userId = c.get('userId'); 
    // const body:{title:string,content:string,published:boolean,id:string} = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,  
    }).$extends(withAccelerate())
    const body = await c.req.json();
	  const { success } = updatePostInput.safeParse(body);
	  if (!success) {
		  c.status(400);
		  return c.json({ error: "invalid input" });
	  }

    
    const post = await prisma.posts.update({
      where:{
        id:body.id,
        authorId:userId
      },
      data: {
        title: body.title,
        content: body.content
      }
    })

    return c.json(post)

  })

  blogRouter.get('/:id',async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate())  
    
    const post = await prisma.posts.findUnique({
      where:{
        id:id
      }
    })
    return c.json(post)
  })

  blogRouter.post('/bulk',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    const blogs = await prisma.posts.findMany({
      select: {
          content: true,
          title: true,
          id: true,
          author: {
              select: {
                  name: true
              }
          }
      },
  });
  return c.json({blogs})
  })  
  

 