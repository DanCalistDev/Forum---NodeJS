
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase


describe('Get Question By slug', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    })


    it('should be able to get a question by slug', async () => {    

        const newQuestion = Question.create({
            authorId: new UniqueEntityID(),
            title: 'Example question',
            slug: Slug.create('example-question'),
            content: 'example content',
        })

        inMemoryQuestionRepository.create(newQuestion)

        const { question } =  await sut.execute({
          slug: 'example-question'
        })
      
        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

      })
})


