import TicketCard from "./TicketCard.jsx";

export default function TicketList({ tickets }) {
  return (
    <section className="ticket-section" aria-labelledby="open-tickets-title">
      <div className="section-heading">
        <div>
          <h1 id="open-tickets-title">Ticket aperti</h1>
          <p>Richieste ancora da gestire dal team supporto.</p>
        </div>
        <span className="ticket-count">{tickets.length}</span>
      </div>

      {tickets.length === 0 ? (
        <div className="state-message">
          Non ci sono ticket aperti.<br />
          Quando verra creato un nuovo ticket, lo vedrai qui.
        </div>
      ) : (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </section>
  );
}
