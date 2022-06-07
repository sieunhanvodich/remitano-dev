import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProvider from './context/context';
import App from './App';
import userEvent from '@testing-library/user-event';
import server from './mocks/server';
import { rest } from 'msw';

const MockApp = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

const doLogin = (email: string, password: string) => {
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginBtn = screen.getByRole('button', {
    name: /login \/ register/i,
  });
  if (email.trim()) {
    userEvent.type(emailInput, email);
  }
  if (password.trim()) {
    userEvent.type(passwordInput, password);
  }
  fireEvent.click(loginBtn);
};

const goToSharePage = async () => {
  doLogin('test@email.com', 'test');
  const shareBtn = await screen.findByRole('button', {
    name: /share a movie/i,
  });
  fireEvent.click(shareBtn);
};

describe('Header', () => {
  it('should render header component', () => {
    render(<MockApp />);
    const appName = screen.getByText(/funny movies/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole('button', {
      name: /login \/ register/i,
    });

    expect(appName).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('should show error message when login with empty input values', async () => {
    render(<MockApp />);
    doLogin('', '');

    const message = await screen.findByText(/Invalid input value/i);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /login \/ register/i,
      }),
    ).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('should show error message when login with wrong password of existed user', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
        (req, res, ctx) =>
          res(
            ctx.status(400),
            ctx.json({
              message: 'Invalid password',
            }),
          ),
      ),
    );
    render(<MockApp />);
    doLogin('test@email.com', 'wrong_password');

    const message = await screen.findByText(/Invalid password/i);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /login \/ register/i,
      }),
    ).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('should show successfull message and change elements after logged in successfully', async () => {
    render(<MockApp />);
    doLogin('test@email.com', 'test');

    const message = await screen.findByText(/Login successfully!/i);
    expect(
      screen.queryByRole('button', { name: /login \/ register/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/password/i)).not.toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /logout/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', {
        name: /share a movie/i,
      }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/welcome test@email.com/i),
    ).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('should display elements in initial state after logged out', async () => {
    render(<MockApp />);
    doLogin('test@email.com', 'test');
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(await screen.findByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('button', {
        name: /login \/ register/i,
      }),
    ).toBeInTheDocument();
  });
});

describe('Home page', () => {
  it('should display list of movies shared', async () => {
    render(<MockApp />);
    const movieElements = await screen.findAllByTestId('movie-container');
    expect(movieElements.length).toBe(2);
  });

  it('should display related message if no movie shared', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_ENDPOINT}/movies/list`,
        (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              movies: [],
            }),
          ),
      ),
    );
    render(<MockApp />);
    const message = await screen.findByText(/no movie shared/i);
    expect(message).toBeInTheDocument();
  });

  it('should not display like/dislike buttons if user not authenticated', async () => {
    render(<MockApp />);
    const movieElements = await screen.findAllByTestId('movie-container');
    const likeElemets = screen.queryAllByTestId('like-container');
    expect(movieElements.length).toBe(2);
    expect(likeElemets.length).toBe(0);
  });

  it('should display like/dislike buttons in each movie section if user authenticated', async () => {
    render(<MockApp />);
    doLogin('test@email.com', 'test');
    const movieElements = await screen.findAllByTestId('movie-container');
    const likeElemets = await screen.findAllByTestId('like-container');
    expect(movieElements.length).toBe(2);
    expect(likeElemets.length).toBe(2);
  });
});

describe('Share page', () => {
  it('should show related route url and elements', async () => {
    render(<MockApp />);
    goToSharePage();

    const title = await screen.findByRole('group', {
      name: /share a youtube movie/i,
    });
    const inputLabel = await screen.findByText(/youtube url/i);
    const input = await screen.findByRole('textbox');
    const shareBtn = await screen.findByRole('button', { name: 'Share' });
    expect(window.location.pathname).toBe('/share');
    expect(title).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });

  it('should show error message when sharing empty url', async () => {
    render(<MockApp />);
    goToSharePage();

    const shareBtn = await screen.findByRole('button', { name: 'Share' });
    fireEvent.click(shareBtn);
    const message = await screen.findByText(/invalid input value/i);

    expect(message).toBeInTheDocument();
  });

  it('should show error message when sharing url that is not youtube format', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_ENDPOINT}/movies/share`,
        (req, res, ctx) =>
          res(ctx.status(400), ctx.json({ message: 'Invalid Youtube Url' })),
      ),
    );
    render(<MockApp />);
    goToSharePage();

    const shareBtn = await screen.findByRole('button', { name: 'Share' });
    const input = await screen.findByRole('textbox');
    userEvent.type(input, 'www.google.com');
    fireEvent.click(shareBtn);
    const message = await screen.findByText(/invalid youtube url/i);
    expect(message).toBeInTheDocument();
  });

  it('should show error message when share existed movie url', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_ENDPOINT}/movies/share`,
        (req, res, ctx) =>
          res(
            ctx.status(400),
            ctx.json({ message: 'This movie has already been shared' }),
          ),
      ),
    );
    render(<MockApp />);
    goToSharePage();

    const shareBtn = await screen.findByRole('button', { name: 'Share' });
    const input = await screen.findByRole('textbox');
    userEvent.type(
      input,
      'https://www.youtube.com/watch?v=xKjOfsIAw-E&ab_channel=SeanGo',
    );
    fireEvent.click(shareBtn);
    const message = await screen.findByText(
      /This movie has already been shared/i,
    );
    expect(message).toBeInTheDocument();
  });

  it('should show successful message if sharing a movie successfully', async () => {
    render(<MockApp />);
    goToSharePage();

    const shareBtn = await screen.findByRole('button', { name: 'Share' });
    const input = await screen.findByRole('textbox');
    userEvent.type(
      input,
      'https://www.youtube.com/watch?v=xKjOfsIAw-E&ab_channel=SeanGo',
    );
    fireEvent.click(shareBtn);
    const message = await screen.findByText(/Movie shared successfully!/i);
    expect(message).toBeInTheDocument();
  });
});
