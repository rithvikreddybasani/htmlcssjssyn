import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { Highlight, themes } from 'prism-react-renderer';

const templates = [
  { id: 1, lang: 'C++', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}' },
  { id: 2, lang: 'HTML', code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>' },
  { id: 3, lang: 'Python', code: 'print("Hello World")' },
];

const Cus= () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12">
          Code Templates
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 cursor-pointer h-48 flex items-center justify-center shadow-xl"
                onClick={() => setSelectedId(template.id)}
              >
                <h3 className="text-2xl font-bold text-white">{template.lang}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="overflow-hidden rounded-lg">
                  <Highlight
                    theme={themes.nightOwl}
                    code={templates.find(t => t.id === selectedId)?.code || ''}
                    language={templates.find(t => t.id === selectedId)?.lang.toLowerCase() || ''}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={`${className} p-4 overflow-auto max-h-[70vh] text-sm`} style={style}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-8 opacity-30 select-none">{i + 1}</span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cus;
