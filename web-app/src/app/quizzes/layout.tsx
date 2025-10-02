import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Bible Quizzes',
  description: 'Test your knowledge of Scripture and SDA theology with interactive quizzes. Multiple choice, true/false, and fill-in-the-blank questions designed to strengthen your faith and deepen your understanding of God\'s Word.',
  keywords: ['Bible quiz', 'SDA quiz', 'Sabbath School quiz', 'Christian trivia', 'Biblical knowledge', 'Seventh-day Adventist'],
  openGraph: {
    title: 'Interactive Bible Quizzes - SabbathTheologyLink',
    description: 'Test your knowledge of Scripture and SDA theology with interactive quizzes.',
    type: 'website',
  },
  twitter: {
    title: 'Interactive Bible Quizzes - SabbathTheologyLink',
    description: 'Test your knowledge of Scripture and SDA theology with interactive quizzes.',
  },
};

export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}