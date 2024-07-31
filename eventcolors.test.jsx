import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventList from './EventList'; // adjust the import based on your file structure

const mockEvents = [
  {
    name: 'Event One',
    type: 'Conference',
    subEvent: 'SubEvent One',
    startDate: '2024-07-01',
    endDate: '2024-07-02',
  },
  {
    name: 'Event Two',
    type: 'Workshop',
    subEvent: 'SubEvent Two',
    startDate: '2024-07-03',
    endDate: '2024-07-04',
  },
];

describe('EventList', () => {
  test('renders EventAvatar components correctly', () => {
    render(<EventList events={mockEvents} />);

    const avatars = screen.getAllByRole('img', { hidden: true }); // Tooltip renders Avatar as hidden img role

    // Check the number of rendered avatars
    expect(avatars).toHaveLength(mockEvents.length);

    // Check if the avatars have the correct initial letters
    expect(avatars[0]).toHaveTextContent('E');
    expect(avatars[1]).toHaveTextContent('E');
  });

  test('displays the correct tooltip information', () => {
    render(<EventList events={mockEvents} />);

    mockEvents.forEach((event, index) => {
      const avatar = screen.getAllByRole('img', { hidden: true })[index];

      // Hover over the avatar to display the tooltip
      expect(screen.queryByText(`Event Name: ${event.name}`)).not.toBeInTheDocument();
      expect(screen.queryByText(`Subtype: ${event.subEvent}`)).not.toBeInTheDocument();
      expect(screen.queryByText(`Dates: ${event.startDate} to ${event.endDate}`)).not.toBeInTheDocument();

      avatar.focus(); // Simulate hover

      expect(screen.getByText(`Event Name: ${event.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Subtype: ${event.subEvent}`)).toBeInTheDocument();
      expect(screen.getByText(`Dates: ${event.startDate} to ${event.endDate}`)).toBeInTheDocument();
    });
  });
});