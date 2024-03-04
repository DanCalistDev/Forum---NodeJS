
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase


describe('Delete Question', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
    })


    it('should be able to delte a question', async () => {    

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        inMemoryQuestionRepository.create(newQuestion)


        console.log(newQuestion)

        await sut.execute({
          questionId: 'question-1',
          authorId: 'author-1',
        })
      
        expect(inMemoryQuestionRepository.items).toHaveLength(0)

      })

      it('should not be able to delte a question from another user', async () => {    

        const newQuestion = makeQuestion(
            {
            authorId: new UniqueEntityID('author-1'),
            }, 
            new UniqueEntityID('question-1')
            )


       await inMemoryQuestionRepository.create(newQuestion)

        expect(()=> {
          return sut.execute({
            questionId: 'question-1',
            authorId: 'author-2',
          })
        }).rejects.toBeInstanceOf(Error)

      })
})


