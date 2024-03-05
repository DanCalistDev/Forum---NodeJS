
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase


describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionRepository)
    })


    it('should be able to edit a question', async () => {    

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))

        inMemoryQuestionRepository.create(newQuestion)


        console.log(newQuestion)

        await sut.execute({
          questionId: newQuestion.id.toValue(),
          authorId: 'author-1',
          title: 'Pergunta teste',
          content: 'conteúdo teste'
        })
      
        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title:'Pergunta teste',
            content: 'conteúdo teste'
        })

      })

      it('should not be able to edit a question from another user', async () => {    

        const newQuestion = makeQuestion(
            {
            authorId: new UniqueEntityID('author-1'),
            }, 
            new UniqueEntityID('question-1')
            )


       await inMemoryQuestionRepository.create(newQuestion)

        expect(()=> {
          return sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-2',
            title: 'Pergunta teste',
            content: 'Conteúdo teste'
          })
        }).rejects.toBeInstanceOf(Error)

      })
})


