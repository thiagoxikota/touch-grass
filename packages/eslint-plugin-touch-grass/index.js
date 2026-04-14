const BRUTAL_VIOLATIONS = [
  { regex: /rounded-((sm)|(md)|(lg)|(xl)|(2xl)|(3xl)|(full))/g, message: 'Zero rounded corners allowed. Found border-radius utility' },
  { regex: /transition(?!-none\b)(-[a-z-]+)?/g, message: 'Zero motion allowed. Found transition utility (use transition-none to explicitly disable motion)' },
  { regex: /duration-[0-9]+/g, message: 'Zero motion allowed. Found duration utility' },
  { regex: /ease-[a-z-]+/g, message: 'Zero motion allowed. Found ease utility' },
  { regex: /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g, message: 'No hex codes allowed in components. Use tokens from var(--color-*) or Tailwind utilities' }
];

module.exports = {
  rules: {
    'enforce-brutalism': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce brutalist design strictness by forbidding motion, rounding, and hardcoded hex.',
          category: 'Stylistic Issues',
          recommended: true
        },
        schema: []
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value !== 'string') return;
            for (const rule of BRUTAL_VIOLATIONS) {
              const localRegex = new RegExp(rule.regex.source, rule.regex.flags);
              if (localRegex.test(node.value)) {
                context.report({ node, message: rule.message });
              }
            }
          },
          TemplateElement(node) {
            if (typeof node.value.raw !== 'string') return;
            for (const rule of BRUTAL_VIOLATIONS) {
              const localRegex = new RegExp(rule.regex.source, rule.regex.flags);
              if (localRegex.test(node.value.raw)) {
                context.report({ node, message: rule.message });
              }
            }
          }
        };
      }
    }
  }
};
