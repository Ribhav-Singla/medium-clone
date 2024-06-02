import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput ,updateBlogInput } from "@ribhavsingla/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        authorId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    // we will be checking the headers here
    const header = c.req.header("authorization") || ""

    const token = header.split(" ")[1]
    try {
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id) {
            c.set("authorId", `${response.id}`);
            await next()
        } else {
            return c.json({ error: "unauthorized" })
        }
    } catch (error) {
        return c.json({ error: "unauthorized" })
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    const authorId = c.get('authorId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select : {
            content : true,
            title : true,
            id: true,
            author : {
                select : {
                    name : true
                }
            }
        }
    });

    return c.json({
        posts
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id  = c.req.param('id');    

    try {
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            select : {
                id : true,
                content : true,
                title : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        
        if (post) {
            return c.json({ post });
        } else {
            c.status(404);
            return c.json({ message: "Post not found" });
        }
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
