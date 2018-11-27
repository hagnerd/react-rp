export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle.es.js',
      format: 'esm',
    }
  ]
}
