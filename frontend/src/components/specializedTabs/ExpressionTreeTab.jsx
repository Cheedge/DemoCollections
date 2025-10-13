import React, { useState } from 'react';
import { Play, Zap, TrendingUp, Clock, Code } from 'lucide-react';

const ExpressionTreeTab = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState(null);
    const [selectedTest, setSelectedTest] = useState('filtering');

    const tests = {
        filtering: {
            name: 'Dynamic Filtering',
            iterations: 100000,
            description: 'Filter products by dynamic criteria',
            scenario: 'Building WHERE clauses from user input',
        },
        sorting: {
            name: 'Dynamic Sorting',
            iterations: 50000,
            description: 'Sort by dynamic property names',
            scenario: 'OrderBy with string property names',
        },
        projection: {
            name: 'Dynamic Projection',
            iterations: 75000,
            description: 'Select specific fields dynamically',
            scenario: 'Building SELECT clauses from API requests',
        },
    };

    const currentTest = tests[selectedTest];

    // Simulate API call to backend
    const runPerformanceTest = async () => {
        setIsRunning(true);
        setResults(null);

        try {
            // Simulated delay (replace with API call)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const mockResults = {
                withExpressionTree: {
                    executionTime: Math.floor(Math.random() * 100) + 50,
                    memoryUsed: Math.floor(Math.random() * 10) + 5,
                    queriesExecuted: currentTest.iterations,
                },
                withReflection: {
                    executionTime: Math.floor(Math.random() * 500) + 800,
                    memoryUsed: Math.floor(Math.random() * 30) + 40,
                    queriesExecuted: currentTest.iterations,
                },
                improvement: {},
            };

            mockResults.improvement = {
                timePercentage: (
                    ((mockResults.withReflection.executionTime -
                        mockResults.withExpressionTree.executionTime) /
                        mockResults.withReflection.executionTime) *
                    100
                ).toFixed(1),
                memoryPercentage: (
                    ((mockResults.withReflection.memoryUsed -
                        mockResults.withExpressionTree.memoryUsed) /
                        mockResults.withReflection.memoryUsed) *
                    100
                ).toFixed(1),
                speedMultiplier: (
                    mockResults.withReflection.executionTime /
                    mockResults.withExpressionTree.executionTime
                ).toFixed(1),
            };

            setResults(mockResults);
        } catch (error) {
            console.error('Performance test failed:', error);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Test Selector */}
            <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Performance Test Scenarios
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(tests).map(([key, test]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedTest(key)}
                            className={`p-4 rounded-lg border-2 transition text-left ${
                                selectedTest === key
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                        >
                            <div className="font-semibold text-gray-800 mb-2">
                                {test.name}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                {test.description}
                            </div>
                            <div className="text-xs text-gray-500">
                                {test.iterations.toLocaleString()} iterations
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Control Panel */}
            <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                            Run Performance Test
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                            {currentTest.scenario}
                        </p>
                    </div>
                    <button
                        onClick={runPerformanceTest}
                        disabled={isRunning}
                        className="px-6 py-3 rounded bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 transition disabled:opacity-50"
                    >
                        {isRunning ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                Running Test...
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                Run {currentTest.iterations.toLocaleString()}{' '}
                                Iterations
                            </>
                        )}
                    </button>
                </div>

                {/* API Endpoint Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Code size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">
                            Backend API Endpoint
                        </span>
                    </div>
                    <code className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded block">
                        GET /api/performance/expression-tree?test={selectedTest}
                        &iterations={currentTest.iterations}
                    </code>
                    <p className="text-xs text-blue-600 mt-2">
                        This calls a .NET API that runs both approaches and
                        returns timing data
                    </p>
                </div>
            </div>

            {/* Results */}
            {results && (
                <div className="space-y-6">
                    {/* Performance Comparison */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Expression Tree Results */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur rounded-lg p-6 border-2 border-green-300 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="text-green-600" size={24} />
                                <h4 className="text-lg font-semibold text-green-800">
                                    With Expression Trees
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 border border-green-200">
                                    <div className="text-sm text-green-600 mb-1">
                                        Execution Time
                                    </div>
                                    <div className="text-3xl font-bold text-green-700">
                                        {
                                            results.withExpressionTree
                                                .executionTime
                                        }
                                        ms
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-green-200">
                                    <div className="text-sm text-green-600 mb-1">
                                        Memory Used
                                    </div>
                                    <div className="text-3xl font-bold text-green-700">
                                        {results.withExpressionTree.memoryUsed}
                                        MB
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-green-200">
                                    <div className="text-sm text-green-600 mb-1">
                                        Queries Executed
                                    </div>
                                    <div className="text-2xl font-bold text-green-700">
                                        {results.withExpressionTree.queriesExecuted.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reflection Results */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur rounded-lg p-6 border-2 border-red-300 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="text-red-600" size={24} />
                                <h4 className="text-lg font-semibold text-red-800">
                                    With Reflection
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 border border-red-200">
                                    <div className="text-sm text-red-600 mb-1">
                                        Execution Time
                                    </div>
                                    <div className="text-3xl font-bold text-red-700">
                                        {results.withReflection.executionTime}ms
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-red-200">
                                    <div className="text-sm text-red-600 mb-1">
                                        Memory Used
                                    </div>
                                    <div className="text-3xl font-bold text-red-700">
                                        {results.withReflection.memoryUsed}MB
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-red-200">
                                    <div className="text-sm text-red-600 mb-1">
                                        Queries Executed
                                    </div>
                                    <div className="text-2xl font-bold text-red-700">
                                        {results.withReflection.queriesExecuted.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Improvement Summary */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border-2 border-orange-300 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="text-orange-600" size={24} />
                            <h4 className="text-xl font-semibold text-orange-800">
                                Performance Improvement
                            </h4>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-orange-200">
                                <div className="text-sm text-orange-600 mb-2">
                                    Time Saved
                                </div>
                                <div className="text-4xl font-bold text-orange-700 mb-1">
                                    {results.improvement.timePercentage}%
                                </div>
                                <div className="text-xs text-orange-600">
                                    Faster execution
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-orange-200">
                                <div className="text-sm text-orange-600 mb-2">
                                    Memory Saved
                                </div>
                                <div className="text-4xl font-bold text-orange-700 mb-1">
                                    {results.improvement.memoryPercentage}%
                                </div>
                                <div className="text-xs text-orange-600">
                                    Less memory usage
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-orange-200">
                                <div className="text-sm text-orange-600 mb-2">
                                    Speed Multiplier
                                </div>
                                <div className="text-4xl font-bold text-orange-700 mb-1">
                                    {results.improvement.speedMultiplier}x
                                </div>
                                <div className="text-xs text-orange-600">
                                    Faster than reflection
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 bg-orange-100 border border-orange-300 rounded-lg p-4">
                            <p className="text-sm text-orange-800">
                                <strong>Why Expression Trees Win:</strong> They
                                compile to native code at runtime (JIT), while
                                reflection performs runtime type lookups on
                                every iteration. For{' '}
                                {currentTest.iterations.toLocaleString()}
                                operations, this difference compounds
                                significantly.
                            </p>
                        </div>
                    </div>

                    {/* Code Comparison */}
                    <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Code Comparison
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Expression Tree */}
                            <div>
                                <div className="text-sm font-medium text-green-700 mb-2">
                                    ✅ With Expression Trees
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-xs text-green-400">
                                        {`// Compiled once, reused many times
public static IQueryable<T> 
  FilterByProperty<T>(
    IQueryable<T> query, 
    string propertyName, 
    object value)
{
    var param = Expression.Parameter(typeof(T));
    var property = Expression.Property(param, propertyName);
    var constant = Expression.Constant(value);
    var equality = Expression.Equal(property, constant);
    
    var lambda = Expression.Lambda<Func<T, bool>>(equality, param);
    
    return query.Where(lambda);
}

// Usage (100,000 times)
var filtered = products
  .FilterByProperty("Category", "Electronics");
// ⚡ Fast: Compiled to IL, no reflection`}
                                    </pre>
                                </div>
                            </div>

                            {/* Reflection */}
                            <div>
                                <div className="text-sm font-medium text-red-700 mb-2">
                                    ❌ With Reflection
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-xs text-red-400">
                                        {`// Uses reflection on every call
public static IEnumerable<T> 
  FilterByPropertyReflection<T>(
    IEnumerable<T> items, 
    string propertyName, 
    object value)
{
    foreach (var item in items)
    {
        var prop = item.GetType()
                       .GetProperty(propertyName);
        if (prop != null)
        {
            var propValue = prop.GetValue(item);
            if (propValue != null && propValue.Equals(value))
                yield return item;
        }
    }
}

// Usage (100,000 times)
var filtered = products
  .FilterByPropertyReflection("Category", "Electronics");
// 🐢 Slow: Reflection per item`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpressionTreeTab;
