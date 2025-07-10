import HomeClient from '@/sections/HomeClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Tiktoken Tokenizer Playground',
  description: 'A playground for tokenizing text using Tiktoken',
};

export default function Page() {
  return (
    <Suspense>
      <HomeClient />
    </Suspense>
  );
}