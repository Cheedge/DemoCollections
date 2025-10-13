import React from 'react';

const UnitTestSample = () =>
    `public class UserServiceTests
{
  [Fact]
  public async Task GetUser_ReturnsUser_WhenExists()
  {
    // Arrange
    var mockRepo = new Mock<IUserRepository>();
    mockRepo.Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(new User { Id = 1, Name = "John" });
    
    var service = new UserService(mockRepo.Object);
    
    // Act
    var result = await service.GetUserAsync(1);
    
    // Assert
    Assert.NotNull(result);
    Assert.Equal("John", result.Name);
    mockRepo.Verify(r => r.GetByIdAsync(1), Times.Once);
  }
}`;
export default UnitTestSample;
