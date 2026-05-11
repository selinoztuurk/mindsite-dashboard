import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ChartVisibilityProvider } from './context/ChartVisibilityContext';
import { CHART_VISIBILITY_STORAGE_KEY } from './storage/chartVisibilityStorage';
import { CHART_WIDTH_STORAGE_KEY } from './storage/chartWidthStorage';

const renderApp = (initialRoute = '/') => {
  render(
    <ChartVisibilityProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </ChartVisibilityProvider>
  );
};

beforeEach(() => {
  window.localStorage.clear();
});

test('renders dashboard charts', () => {
  renderApp();
  expect(screen.getByText(/performance dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /buybox win rate by brand/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /overall search visibility trend/i })).toBeInTheDocument();
});

test('hides and shows charts completely from settings controls', async () => {
  renderApp('/settings');

  const searchVisibilityCheckbox = screen.getByRole('checkbox', {
    name: /overall search visibility trend/i,
  });

  await userEvent.click(searchVisibilityCheckbox);
  await userEvent.click(screen.getByRole('link', { name: /dashboard/i }));

  expect(
    screen.queryByRole('heading', { name: /overall search visibility trend/i })
  ).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: /settings/i }));
  await userEvent.click(
    screen.getByRole('checkbox', {
      name: /overall search visibility trend/i,
    })
  );
  await userEvent.click(screen.getByRole('link', { name: /dashboard/i }));

  expect(
    screen.getByRole('heading', { name: /overall search visibility trend/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /hide overall search visibility trend/i })
  ).toBeInTheDocument();
});

test('hides and shows chart labels from chart controls', async () => {
  renderApp();

  const buyboxCard = screen
    .getByRole('heading', { name: /buybox win rate by brand/i })
    .closest('section');

  if (!buyboxCard) {
    throw new Error('Buybox chart card was not found.');
  }

  const northwindToggle = within(buyboxCard).getByRole('button', {
    name: /toggle northwind/i,
  });

  expect(northwindToggle).toHaveAttribute('aria-pressed', 'true');

  await userEvent.click(northwindToggle);
  expect(northwindToggle).toHaveAttribute('aria-pressed', 'false');

  await userEvent.click(northwindToggle);
  expect(northwindToggle).toHaveAttribute('aria-pressed', 'true');
});

test('hides and shows charts from chart card controls', async () => {
  renderApp();

  const searchVisibilityCard = screen
    .getByRole('heading', { name: /overall search visibility trend/i })
    .closest('section');

  if (!searchVisibilityCard) {
    throw new Error('Search visibility chart card was not found.');
  }

  const hideButton = within(searchVisibilityCard).getByRole('button', {
    name: /hide overall search visibility trend/i,
  });

  await userEvent.click(hideButton);
  expect(
    within(searchVisibilityCard).getByRole('button', {
      name: /show overall search visibility trend/i,
    })
  ).toBeInTheDocument();

  await userEvent.click(
    within(searchVisibilityCard).getByRole('button', {
      name: /show overall search visibility trend/i,
    })
  );
  expect(
    within(searchVisibilityCard).getByRole('button', {
      name: /hide overall search visibility trend/i,
    })
  ).toBeInTheDocument();
});

test('persists chart visibility in local storage', async () => {
  renderApp('/settings');

  const searchVisibilityCheckbox = screen.getByRole('checkbox', {
    name: /overall search visibility trend/i,
  });

  await userEvent.click(searchVisibilityCheckbox);

  const storedVisibility = JSON.parse(
    window.localStorage.getItem(CHART_VISIBILITY_STORAGE_KEY) ?? '{}'
  );

  expect(storedVisibility.searchVisibility).toBe(false);
});

test('updates chart width from settings controls', async () => {
  renderApp('/settings');

  const buyboxWidthSelect = screen.getByRole('combobox', {
    name: /width for buybox win rate by brand/i,
  });

  await userEvent.selectOptions(buyboxWidthSelect, 'full');
  await userEvent.click(screen.getByRole('link', { name: /dashboard/i }));

  const buyboxCard = screen
    .getByRole('heading', { name: /buybox win rate by brand/i })
    .closest('section');

  expect(buyboxCard).toHaveClass('dashboard__chart--full');
});

test('persists chart width in local storage', async () => {
  renderApp('/settings');

  const buyboxWidthSelect = screen.getByRole('combobox', {
    name: /width for buybox win rate by brand/i,
  });

  await userEvent.selectOptions(buyboxWidthSelect, 'full');

  const storedWidths = JSON.parse(
    window.localStorage.getItem(CHART_WIDTH_STORAGE_KEY) ?? '{}'
  );

  expect(storedWidths.buybox).toBe('full');
});

test('loads chart width from local storage', () => {
  window.localStorage.setItem(
    CHART_WIDTH_STORAGE_KEY,
    JSON.stringify({
      buybox: 'full',
      availability: 'half',
      searchVisibility: 'half',
      shareOfVoice: 'half',
    })
  );

  renderApp();

  const buyboxCard = screen
    .getByRole('heading', { name: /buybox win rate by brand/i })
    .closest('section');

  expect(buyboxCard).toHaveClass('dashboard__chart--full');
});

test('loads chart visibility from local storage', () => {
  window.localStorage.setItem(
    CHART_VISIBILITY_STORAGE_KEY,
    JSON.stringify({
      buybox: true,
      availability: true,
      searchVisibility: false,
      shareOfVoice: true,
    })
  );

  renderApp();

  expect(
    screen.queryByRole('heading', { name: /overall search visibility trend/i })
  ).not.toBeInTheDocument();
});
