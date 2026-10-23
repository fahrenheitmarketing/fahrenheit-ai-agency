// Extracts Q&A pairs from a markdown "## FAQs..." section where each question is an "### " heading.
export default function parseMarkdownFaqs(markdown) {
  const section = (markdown.split(/^## FAQs[^\n]*\n/m)[1] || '').split(/^## /m)[0];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split('\n');
      return { question: question.trim(), answer: rest.join(' ').replace(/\s+/g, ' ').trim() };
    });
}