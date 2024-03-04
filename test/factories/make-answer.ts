import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer';
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from '@faker-js/faker'


export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityID) {
    const answer = Answer.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return answer
   
}