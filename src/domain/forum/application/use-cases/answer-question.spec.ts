import { Answer } from './../../enterprise/entities/answer';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryQuestionRepository } from './../../../../../test/repositories/in-memory-question-repository';
import { CreateQuestionUseCase } from './create-question'
import { AnswerQuestionUseCase } from './answer-question';


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase


describe('Create Answers', () => {

    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswerRepository()
        sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
    })


    it('should be able to create a question', async () => {    
        const { answer } =  await sut.execute({
          questionId: '1',
          instructorId: '1',
          content: 'Conteúdo da resposta',
        })
      
        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
      })
})


