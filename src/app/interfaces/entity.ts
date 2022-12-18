export interface User {
    userId: number;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    gender: String;
    active: boolean;
    otp: number;
    authToken: String;
    role: role;
}
export interface Exam {
    examId: number;
    examName: string;
    time: number;
    isshow: boolean;
    level: string;
    date: string;
    startAt: any;
    endAt: any;
    percentage: number;
}
export interface Subject {
    subjectId: number;
    subjectName: string;
    course: Course;
}
export interface Course {
    courseId: number;
    courseName: number;
}
export interface role {
    roleId: number;
    roleName: string;
}

export interface Question {
    questionId: number;
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    correctAnswer: string;
    level: string;
    subject: Subject;
    selected: string;
}
export interface Result {
  resultId: number;
	obtainMarks: number;
  totalMarks: number;
	status:string;
	user:User;
	exam:Exam;
}

