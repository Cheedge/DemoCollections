using System;
using backend.Auth.Applications.CommandHandlers;
using backend.Auth.Applications.Commands;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Entities;
using backend.Auth.Infrastructures.Repos;
using Moq;

namespace backend.Tests.Auth
{
    public class LoginCommandHandlerTests
    {

        private readonly Mock<IAuthRepo> _repoMock = new();
        private readonly Mock<IAuthService> _authServiceMock = new();

        [Fact]
        public async Task HandleAsync_ValidUser_ReturnsTokens()
        {
            // Arrange
            var user = new UserEntity { Username = "test", PasswordHash = "123" };
            _repoMock.Setup(r => r.GetUserAsync("test")).ReturnsAsync(user);

            _authServiceMock.Setup(a => a.CreateJwtToken(user)).Returns("access-token");
            _authServiceMock.Setup(a => a.CreateRefreshToken(user))
                .Returns(new RefreshTokenEntity { Token = "refresh-token" });

            var handler = new LoginCommandHandler(_repoMock.Object, _authServiceMock.Object);
            var cmd = new LoginCommand { UserName = "test", PassWord = "123" };

            // Act
            var (access, refresh) = await handler.HandleAsync(cmd);

            // Assert
            Assert.Equal("access-token", access);
            Assert.Equal("refresh-token", refresh);
            _repoMock.Verify(r => r.AddRefreshTokenAsync(It.IsAny<RefreshTokenEntity>()), Times.Once);
        }

        [Fact]
        public async Task HandleAsync_InvalidPassword_ThrowsUnauthorized()
        {
            // Arrange
            var user = new UserEntity { Username = "test", PasswordHash = "123" };
            _repoMock.Setup(r => r.GetUserAsync("test")).ReturnsAsync(user);

            var handler = new LoginCommandHandler(_repoMock.Object, _authServiceMock.Object);
            var cmd = new LoginCommand { UserName = "test", PassWord = "wrong" };

            // Act + Assert
            await Assert.ThrowsAsync<UnauthorizedAccessException>(() => handler.HandleAsync(cmd));
        }

        [Fact]
        public async Task HandleAsync_UserNotFound_ThrowsUnauthorized()
        {
            _repoMock.Setup(r => r.GetUserAsync(It.IsAny<string>())).ReturnsAsync((UserEntity?)null);
            var handler = new LoginCommandHandler(_repoMock.Object, _authServiceMock.Object);

            await Assert.ThrowsAsync<UnauthorizedAccessException>(() => handler.HandleAsync(
                new LoginCommand { UserName = "noUser", PassWord = "pw" }));
        }
    }
}

