using Xunit;
using Moq;
using System;
using System.Threading.Tasks;
using backend.Auth.Applications.CommandHandlers;
using backend.Auth.Applications.Commands;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Repos;
using backend.Auth.Infrastructures.Entities;
namespace backend.Tests.Auth
{
    public class RefreshCommandHandlerTests
    {
        private readonly Mock<IAuthRepo> _repoMock = new();
        private readonly Mock<IAuthService> _authServiceMock = new();

        [Fact]
        public async Task HandleAsync_ValidToken_ReturnsNewTokens()
        {
            var user = new UserEntity { Username = "test" };
            var oldToken = new RefreshTokenEntity
            {
                Token = "old",
                User = user,
                Expires = DateTime.UtcNow.AddMinutes(10),
                IsRevoked = false
            };

            _repoMock.Setup(r => r.GetRefreshTokenAsync("old")).ReturnsAsync(oldToken);
            _authServiceMock.Setup(a => a.CreateJwtToken(user)).Returns("new-access");
            _authServiceMock.Setup(a => a.CreateRefreshToken(user))
                .Returns(new RefreshTokenEntity { Token = "new-refresh" });

            var handler = new RefreshCommandHandler(_repoMock.Object, _authServiceMock.Object);
            var cmd = new RefreshCommand { RefreshToken = "old" };

            var (access, refresh) = await handler.HandleAsync(cmd);

            Assert.Equal("new-access", access);
            Assert.Equal("new-refresh", refresh);
            Assert.True(oldToken.IsRevoked);
            _repoMock.Verify(r => r.AddRefreshTokenAsync(It.IsAny<RefreshTokenEntity>()), Times.Once);
            _repoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
        }

        [Fact]
        public async Task HandleAsync_ExpiredToken_ThrowsUnauthorized()
        {
            var token = new RefreshTokenEntity
            {
                Token = "expired",
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            _repoMock.Setup(r => r.GetRefreshTokenAsync("expired")).ReturnsAsync(token);
            var handler = new RefreshCommandHandler(_repoMock.Object, _authServiceMock.Object);

            await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                handler.HandleAsync(new RefreshCommand { RefreshToken = "expired" }));
        }

        [Fact]
        public async Task HandleAsync_InvalidToken_ThrowsUnauthorized()
        {
            _repoMock.Setup(r => r.GetRefreshTokenAsync("bad")).ReturnsAsync((RefreshTokenEntity?)null);
            var handler = new RefreshCommandHandler(_repoMock.Object, _authServiceMock.Object);

            await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                handler.HandleAsync(new RefreshCommand { RefreshToken = "bad" }));
        }
    }
}