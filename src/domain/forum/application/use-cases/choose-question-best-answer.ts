import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerCaseRequest {
  authorId: string
  answerId: string

}

interface ChooseQuestionBestAnswerCaseResponse {
    question: Question
  }

export class ChooseQuestionBestAnswerCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId
 
  }: ChooseQuestionBestAnswerCaseRequest): Promise<ChooseQuestionBestAnswerCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
        throw new Error('Answer not found')
      }

    const question = await this.questionRepository.findById(answer.questionId.toString())

    if(!question) {
      throw new Error('Question not found')
    }

    if(authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question
    }

  }
}
