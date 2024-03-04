import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase


describe('Delete Answer', () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
    })


    it('should be able to delte a answer', async () => {    

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))
        inMemoryAnswerRepository.create(newAnswer)


        console.log(newAnswer)

        await sut.execute({
          answerId: 'answer-1',
          authorId: 'author-1',
        })
      
        expect(inMemoryAnswerRepository.items).toHaveLength(0)

      })

      it('should not be able to delte a answer from another user', async () => {    

        const newAnswer = makeAnswer(
            {
            authorId: new UniqueEntityID('author-1'),
            }, 
            new UniqueEntityID('answer-1')
            )


       await inMemoryAnswerRepository.create(newAnswer)

        expect(()=> {
          return sut.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
          })
        }).rejects.toBeInstanceOf(Error)

      })
})


