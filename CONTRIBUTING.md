# Contributing to AuthMate SDK

Thank you for your interest in contributing to AuthMate SDK! We welcome contributions from the community and are pleased to have you join us.

## 🤝 How to Contribute

### 1. Fork the Repository

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/AuthMate-sdk-typescript.git
   cd AuthMate-sdk-typescript
   ```

### 2. Set Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run development mode:
   ```bash
   npm run dev
   ```

### 3. Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
   or
   ```bash
   git checkout -b fix/bug-description
   ```

2. Make your changes following our coding standards (see below)

3. Test your changes thoroughly

4. Commit your changes with a descriptive message:
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. Push to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```

6. Open a Pull Request on GitHub

## 📝 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Follow existing code style and patterns
- Add proper type definitions for all functions and interfaces
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Code Style

- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use single quotes for strings
- Keep lines under 100 characters when possible
- Remove trailing whitespace

### Example Code Style

```typescript
interface UserData {
  id: string;
  name: string;
  email: string;
}

/**
 * Authenticates a user with email and password
 * @param credentials - User login credentials
 * @returns Promise resolving to authentication response
 */
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new AuthMateError('Authentication failed', error);
  }
}
```

## 🧪 Testing

- Write tests for new features and bug fixes
- Ensure all existing tests pass
- Add integration tests for API endpoints
- Test with both React and Next.js environments

```bash
npm run test
```

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] Documentation is updated if needed
- [ ] Changes are properly typed
- [ ] No breaking changes (or properly documented)

### Pull Request Description

Please include:

1. **Description**: What does this PR do?
2. **Type**: Feature/Bug Fix/Documentation/Refactor
3. **Testing**: How was this tested?
4. **Breaking Changes**: Any breaking changes?
5. **Related Issues**: Link to related issues

### Example PR Template

```markdown
## Description
Add support for custom storage adapters

## Type
- [x] Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Refactor

## Testing
- Tested with localStorage
- Tested with custom cookie storage
- All existing tests pass

## Breaking Changes
None

## Related Issues
Closes #123
```

## 🐛 Reporting Issues

### Bug Reports

Please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Node version, SDK version
- **Code Sample**: Minimal reproduction code

### Feature Requests

Please include:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions you've considered
- **Examples**: Code examples if applicable

## 📚 Documentation

- Update README.md for user-facing changes
- Update API documentation for new methods
- Add examples for new features
- Update CHANGELOG.md with your changes

## 🏷️ Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## 📄 License

By contributing to AuthMate SDK, you agree that your contributions will be licensed under the ISC License.

## ❓ Questions?

If you have questions about contributing, please:

1. Check existing issues and discussions
2. Open a new issue with the "question" label
3. Reach out to maintainers

## 🎉 Recognition

Contributors will be recognized in:

- CHANGELOG.md for their contributions
- GitHub contributors list
- Special thanks in release notes for significant contributions

Thank you for helping make AuthMate SDK better! 🚀
