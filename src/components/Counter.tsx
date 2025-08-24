import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [gradientIndex, setGradientIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down'>('down');

  const gradients = [
    'from-pink-400 via-purple-500 to-indigo-600',
    'from-green-400 via-blue-500 to-purple-600',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-blue-400 via-cyan-500 to-teal-600',
    'from-purple-400 via-pink-500 to-rose-500',
    'from-indigo-400 via-blue-500 to-cyan-500',
  ];

  const getDigits = (num: number): string[] => {
    return num.toString().split('');
  };

  const handleIncrement = () => {
    setPrevCount(count);
    setCount(prev => prev + 1);
    setGradientIndex(prev => (prev + 1) % gradients.length);
    setAnimationDirection('down');
  };

  const handleDecrement = () => {
    setPrevCount(count);
    setCount(prev => Math.max(0, prev - 1));
    setGradientIndex(prev => (prev + 1) % gradients.length);
    setAnimationDirection('up');
  };

  const renderAnimatedDigits = () => {
    const currentDigits = getDigits(count);
    const previousDigits = getDigits(prevCount);
    
    // Pad with leading spaces to align digits properly
    const maxLength = Math.max(currentDigits.length, previousDigits.length);
    const paddedCurrent = currentDigits;
    const paddedPrevious = previousDigits;

    return paddedCurrent.map((digit, index) => {
      const prevDigit = paddedPrevious[index];
      const hasChanged = digit !== prevDigit;
      
      return (
        <span
          key={`${index}-${hasChanged ? count : 'static'}`}
          className={`inline-block ${
            hasChanged 
              ? animationDirection === 'down' ? 'animate-slide-down' : 'animate-slide-up'
              : ''
          }`}
        >
          {digit}
        </span>
      );
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[gradientIndex]} transition-all duration-1000 ease-in-out flex items-center justify-center`}>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30">
          <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
            Fun Counter! 🎉
          </h1>
          
          <div className="mb-10 relative overflow-hidden h-32 flex items-center justify-center">
            <div className="text-8xl font-bold text-white drop-shadow-2xl transform transition-all duration-300 hover:scale-110">
              {renderAnimatedDigits()}
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <Button
              onClick={handleDecrement}
              disabled={count === 0}
              size="lg"
              className="h-16 w-16 rounded-full bg-white/30 hover:bg-white/40 text-white border-2 border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Minus size={24} />
            </Button>
            
            <Button
              onClick={handleIncrement}
              size="lg"
              className="h-16 w-16 rounded-full bg-white/30 hover:bg-white/40 text-white border-2 border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Plus size={24} />
            </Button>
          </div>

          <p className="text-white/80 mt-6 text-lg">
            Click the buttons and watch the magic! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counter;