import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@tufail2000/blog-common";

//env setup
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//Middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader) {
    return c.text("Missing token", 401);
  }

  try {
    const user = (await verify(authHeader, c.env.JWT_SECRET)) as { id: string };

    if (!user) {
      return c.json({ msg: "You are not logged in" }, 403);
    }
    // Store user ID in context
    c.set("userId", user.id);
    return await next();
  } catch (err) {
    console.error(err);
    return c.text("Invalid or expired token", 403);
  }
});

//blog post route
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authorId = c.get("userId");

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "input not correct" });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({ blog });
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ msg: "Error creating blog" });
  }finally {
    await prisma.$disconnect();  // Good practice: Always disconnect Prisma
  }
});

//blog edit route
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // ✅ Validate input
  const parsed = updateBlogInput.safeParse(body);
  if (!parsed.success) {
    c.status(411);
    return c.json({ msg: "Input not correct", error: parsed.error });
  }

  const { id, title, content } = parsed.data;
  try {
    // Build the data object dynamically
    const data: { title?: string; content?: string } = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.content !== undefined) data.content = body.content;

    const blog = await prisma.blog.update({
      where: { id },
      data,
    });
    return c.json({ blog });
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ msg: "Error in getting blog user" });
  }finally {
    await prisma.$disconnect();  // Good practice: Always disconnect Prisma
  }
});

//get all blog route
//todo: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ msg: "Error in getting blog" });
  }finally {
    await prisma.$disconnect();  
  }
});

//blog get by id route
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select:{
        id:true,
        title:true,
        content:true,
        author: {
          select:{
            name:true,

          }
        }
      }
    });

    return c.json({ blog });
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ msg: "Error in getting post" });
  }finally {
    await prisma.$disconnect();  // Good practice: Always disconnect Prisma
  }
});
