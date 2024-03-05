import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase


describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new EditAnswerUseCase(inMemoryAnswerRepository)
    })


    it('should be able to edit a answer', async () => {    

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))

        inMemoryAnswerRepository.create(newAnswer)


        console.log(newAnswer)

        await sut.execute({
          answerId: newAnswer.id.toValue(),
          authorId: 'author-1',
          content: 'conteúdo teste'
        })
      
        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
            content: 'conteúdo teste'
        })

      })

      it('should not be able to edit a answer from another user', async () => {    

        const newAnswer = makeAnswer(
            {
            authorId: new UniqueEntityID('author-1'),
            }, 
            new UniqueEntityID('answer-1')
            )


       await inMemoryAnswerRepository.create(newAnswer)

        expect(()=> {
          return sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo teste'
          })
        }).rejects.toBeInstanceOf(Error)

      })
})


