import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bible Study Modules',
  description: 'Explore comprehensive Bible study modules including Sabbath School Quarterly lessons, biblical stories, and theological insights from a Seventh-day Adventist perspective. Strengthen your faith through structured learning.',
  keywords: ['Bible study', 'Sabbath School lessons', 'SDA theology', 'Christian education', 'Biblical studies', 'Seventh-day Adventist'],
  openGraph: {
    title: 'Bible Study Modules - SabbathTheologyLink',
    description: 'Explore comprehensive Bible study modules including Sabbath School Quarterly lessons and theological insights.',
    type: 'website',
  },
  twitter: {
    title: 'Bible Study Modules - SabbathTheologyLink',
    description: 'Explore comprehensive Bible study modules including Sabbath School Quarterly lessons and theological insights.',
  },
};

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}