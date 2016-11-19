/*
 * ProfileView Messages
 *
 * This contains all the text for the ProfileView component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  subtitle: {
    id: 'app.components.ProfileView.subtitle',
    defaultMessage: 'Position: {position} - Total: {total} L - Daily: {daily} L/day',
  },
  date: {
    id: 'app.components.ProfileView.date',
    defaultMessage: 'Date',
  },
  brand: {
    id: 'app.components.ProfileView.brand',
    defaultMessage: 'Brand',
  },
  amount: {
    id: 'app.components.ProfileView.amount',
    defaultMessage: 'Amount (L)',
  },
  delete: {
    id: 'app.components.ProfileView.delete',
    defaultMessage: 'Delete',
  },
});
