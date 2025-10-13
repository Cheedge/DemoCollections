import React from 'react';

const ExpressionSample = () =>
    `// Compiled once, reused many times
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
// ⚡ Fast: Compiled to IL, no reflection`;

export default ExpressionSample;
