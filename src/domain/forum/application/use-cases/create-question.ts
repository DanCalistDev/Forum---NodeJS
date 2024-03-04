import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/questions-repository";
import { Slug } from "../../enterprise/entities/value-objects/slug";


interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
  }

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
  authorId,
  title,
  content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
        authorId: new UniqueEntityID(authorId),
        title,
        content,
        slug: Slug.createFromText(title)
    })

    await this.questionRepository.create(question)

    return {
      question
    }

  }
}
