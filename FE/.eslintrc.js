module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'plugin:storybook/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'max-len': [2, { code: 110 }],
    'react/no-unescaped-entities': 0, //
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'arrow-body-style': 0, // return 하고 괄호 없이 반환 끄기
    'no-unused-vars': 1, // 사용하지 않는 변수 warning
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0, // 하나의 변수만 export할때 default로 해야만하는 규칙 off
    'react/jsx-fragments': 0, // React.Fragment 사용을 위한 규칙 off.
    'react/jsx-pascal-case': 0, // Styled Component로 생성한 Component 이름 앞에 $ 쓰고 싶어서 규칙 off
    'object-curly-newline': 0, // export를 한번에 하기 위한 코딩 컨벤션을 위해 규칙 off.
    'storybook/story-exports': 0, // story book export 하기싫음.
    'react/jsx-props-no-spreading': 0, // props 객체 spread 적용위해 규칙 off
    'react/require-default-props': 0, // default props는 분해할당으로 받을때 default 값 줄거기 때문에 규칙 off
    'padding-line-between-statements': [
      // 선언부, 로직, return 사이 공백추가를 위한 설정
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    ],
    'react/forbid-prop-types': 0, // Proptypes.object, array 사용하기 위해 off
    'react/jsx-no-constructed-context-values': 0, // context 전달할때 useMemo, useCallback으로 필수적으로 감싸야하는 설정 off
    'react/destructuring-assignment': 0, // context state받는데 depth 2개 이상되면 구조분해할당으로 받으라는 lint 규칙 삭제
    'operator-linebreak': 0, // 길어지는 조건문 오류처리 제거
    'react/jsx-indent': 0, // Sidebar indent 수정위해 off.
    indent: 0, // Sidebar indent 수정위해 off.
    'no-unused-expressions': 0, // 삼항연산자 길게 쓰면 오류뜨게함. if-else문으로 대체하래..휴..
    'no-param-reassign': 0,
  },
};
