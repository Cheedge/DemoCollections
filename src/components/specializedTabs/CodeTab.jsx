import React from 'react';
import { Code } from 'lucide-react';

const CodeTab = ({ demoId }) => (
    <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                .NET Lambda Function Example
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                    {`public class Function
{
    private readonly IProductRepository _repository;

    public Function()
    {
        _repository = new DynamoDBProductRepository();
    }

    public async Task<APIGatewayProxyResponse> FunctionHandler(
        APIGatewayProxyRequest request, 
        ILambdaContext context)
    {
        try
        {
            var products = await _repository.GetProductsAsync();
            
            return new APIGatewayProxyResponse
            {
                StatusCode = 200,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" }
                },
                Body = JsonSerializer.Serialize(products)
            };
        }
        catch (Exception ex)
        {
            context.Logger.LogError($"Error: {ex.Message}");
            return new APIGatewayProxyResponse
            {
                StatusCode = 500,
                Body = JsonSerializer.Serialize(new { error = ex.Message })
            };
        }
    }
}`}
                </pre>
            </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-800 mb-4">
                Database Options Comparison
            </h4>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-amber-100">
                        <tr>
                            <th className="text-left p-2 text-amber-900">
                                Option
                            </th>
                            <th className="text-left p-2 text-amber-900">
                                Free Tier
                            </th>
                            <th className="text-left p-2 text-amber-900">
                                Best For
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-amber-900">
                        <tr className="border-t border-amber-200">
                            <td className="p-2 font-medium">DynamoDB</td>
                            <td className="p-2">25GB, 25 RCU/WCU</td>
                            <td className="p-2">
                                NoSQL, serverless ⭐ Recommended
                            </td>
                        </tr>
                        <tr className="border-t border-amber-200">
                            <td className="p-2 font-medium">MongoDB Atlas</td>
                            <td className="p-2">512MB forever free</td>
                            <td className="p-2">Document DB, easy setup</td>
                        </tr>
                        <tr className="border-t border-amber-200">
                            <td className="p-2 font-medium">
                                SQLite on Lambda
                            </td>
                            <td className="p-2">Free (in /tmp)</td>
                            <td className="p-2">Simple demos only</td>
                        </tr>
                        <tr className="border-t border-amber-200">
                            <td className="p-2 font-medium">Supabase</td>
                            <td className="p-2">500MB PostgreSQL</td>
                            <td className="p-2">Relational + realtime</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
                View Full Source Code
            </h4>
            <p className="text-blue-700 mb-4">
                Complete implementation with deployment scripts available on
                GitHub
            </p>
            <a
                href="#"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition"
            >
                <Code size={18} />
                View on GitHub
            </a>
        </div>
    </div>
);

export default CodeTab;
