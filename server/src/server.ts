import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from 'prisma/prisma-client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    log: ['query']
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

     /*======= GET POOLS COUNT =======*/
    fastify.get('/pools/count', async () => {
       const count = await prisma.pool.count()
        
        return {count}
    })
    
    /*======= GET USERS COUNT =======*/
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()
         
         return {count}
     })

    /*======= GET GUESSES COUNT =======*/
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()
             
        return {count}
    })

     /*======= POST POOL =======*/
    fastify.post('/pools', async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body)

        const generate = new ShortUniqueId({ length: 6 })
        const  code = String(generate()).toUpperCase()
        await prisma.pool.create({
            data: {
                title,
                code
            }
        })

        return reply.status(201).send({code})
     })

    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()