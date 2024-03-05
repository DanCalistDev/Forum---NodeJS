import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';

import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { ChooseQuestionBestAnswerCase } from './choose-question-best-answer';
import { makeAnswer } from 'test/factories/make-answer';


let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerCase


describe('Choose Question Best Answer', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new ChooseQuestionBestAnswerCase(inMemoryQuestionRepository, inMemoryAnswerRepository)
    })


    it('should be able to choose the question best answer', async () => {    

       const question = makeQuestion()
       const answer = makeAnswer({questionId: question.id})

       await inMemoryQuestionRepository.create(question)
       await inMemoryAnswerRepository.create(answer)


        await sut.execute({
          answerId: answer.id.toString(),
          authorId: question.authorId.toString(),
        })
      
        expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)

      })

      it('should not be able to choose another user question best answer', async () => {    

        const question = makeQuestion({authorId: new UniqueEntityID('author-1')})
        const answer = makeAnswer({questionId: question.id})
 
        await inMemoryQuestionRepository.create(question)
        await inMemoryAnswerRepository.create(answer)
 
        expect(()=> {
          return sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author-2',
          })
        }).rejects.toBeInstanceOf(Error)

      })
})


