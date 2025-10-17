import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@tufail2000/blog-common";

//env setup
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//signUp route
userRouter.post("/Signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "input not correct" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        userName: body.userName,
        password: body.password,
        name: body.name,
      },
    });
    const jwt_token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt_token);
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ msg: "Error creating user" });
  }
});

//signIn route
userRouter.post("/Signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "input not correct" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: body.userName,
        password: body.password,
      },
    });
    if (!user) {
      c.status(401); //unauthorized
      return c.text("Invalid");
    }

    const jwt_token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt_token);
  } catch (error) {
    console.error(error);
    c.status(411);
    return c.json({ msg: "Error creating user" });
  }
});
