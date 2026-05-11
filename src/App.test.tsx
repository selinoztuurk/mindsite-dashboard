import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { ChartVisibilityProvider } from './context/ChartVisibilityContext';
import { ToastProvider } from './context/ToastContext';
import { dashboardChartFetchers } from './data/charts';
import { fetchDashboardChart } from './services/dashboardChartService';
import { CHART_VISIBILITY_STORAGE_KEY } from './storage/chartVisibilityStorage';
import { CHART_WIDTH_STORAGE_KEY } from './storage/chartWidthStorage';

jest.mock('./services/dashboardChartService');

const waitForDashboardChartsToLoad = async () => {
  await waitFor(() => {
    expect(screen.queryAllByRole('status')).toHaveLength(0);
  });
};

const renderApp = async (initialRoute = '/') => {
  render(
    <ToastProvider>
      <ChartVisibilityProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <AppRoutes />
        </MemoryRouter>
      </ChartVisibilityProvider>
    </ToastProvider>
  );

  if (initialRoute === '/') {
    await waitForDashboardChartsToLoad();
  }
};

beforeEach(() => {
  window.localStorage.clear();
  jest.mocked(fetchDashboardChart).mockImplementation((chartId) =>
    Promise.resolve(dashboardChartFetchers[chartId]())
  );
});

test('shows a toast when a dashboard chart fails to load', async () => {
  jest.mocked(fetchDashboardChart).mockImplementation((chartId) => {
    if (chartId === 'buybox') {
      return Promise.reject(new Error('Network error'));
    }

    return Promise.resolve(dashboardChartFetchers[chartId]());
  });

  await renderApp();

  const toast = await screen.findByRole('alert');

  expect(toast).toHaveTextContent(/unable to load buybox win rate by brand/i);
  expect(toast).toHaveClass('toast');
});

test('renders dashboard charts', async () => {
  await renderApp();
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
  await waitForDashboardChartsToLoad();

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
  await waitForDashboardChartsToLoad();

  expect(
    screen.getByRole('heading', { name: /overall search visibility trend/i })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: /hide overall search visibility trend/i })
  ).toBeInTheDocument();
});

test('hides and shows chart labels from chart controls', async () => {
  await renderApp();

  const buyboxCard = screen
    .getByRole('heading', { name: /buybox win rate by brand/i })
    .closest('section');

  if (!buyboxCard) {
    throw new Error('Buybox chart card was not found.');
  }

  const northwindToggle = await within(buyboxCard).findByRole('button', {
    name: /toggle northwind/i,
  });

  expect(northwindToggle).toHaveAttribute('aria-pressed', 'true');

  await userEvent.click(northwindToggle);
  expect(northwindToggle).toHaveAttribute('aria-pressed', 'false');

  await userEvent.click(northwindToggle);
  expect(northwindToggle).toHaveAttribute('aria-pressed', 'true');
});

test('hides and shows charts from chart card controls', async () => {
  await renderApp();

  const searchVisibilityCard = screen
    .getByRole('heading', { name: /overall search visibility trend/i })
    .closest('section');

  if (!searchVisibilityCard) {
    throw new Error('Search visibility chart card was not found.');
  }

  const hideButton = await within(searchVisibilityCard).findByRole('button', {
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
  await waitForDashboardChartsToLoad();

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

test('loads chart width from local storage', async () => {
  window.localStorage.setItem(
    CHART_WIDTH_STORAGE_KEY,
    JSON.stringify({
      buybox: 'full',
      availability: 'half',
      searchVisibility: 'half',
      shareOfVoice: 'half',
    })
  );

  await renderApp();

  const buyboxCard = screen
    .getByRole('heading', { name: /buybox win rate by brand/i })
    .closest('section');

  expect(buyboxCard).toHaveClass('dashboard__chart--full');
});

test('loads chart visibility from local storage', async () => {
  window.localStorage.setItem(
    CHART_VISIBILITY_STORAGE_KEY,
    JSON.stringify({
      buybox: true,
      availability: true,
      searchVisibility: false,
      shareOfVoice: true,
    })
  );

  await renderApp();

  expect(
    screen.queryByRole('heading', { name: /overall search visibility trend/i })
  ).not.toBeInTheDocument();
});
