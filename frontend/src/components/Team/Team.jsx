import React from "react";
import "./Team.css";
import Chef1 from "../../assets/img/chef-1.jpg";
import Chef2 from "../../assets/img/chef-2.jpg";
import Chef3 from "../../assets/img/chef-3.jpg";

// Team data
const teamMembers = [
  {
    name: "Aaron Patel",
    role: "CEO",
    specialty: "Leadership & Innovation",
    image: Chef1,
  },
  {
    name: "Daniel Tebas",
    role: "Chef",
    specialty: "Italian Cuisine",
    image: Chef2,
  },
  {
    name: "Jon Snow",
    role: "Chef",
    specialty: "Gourmet & Fusion Dishes",
    image: Chef3,
  },
];

const TeamCard = ({ name, role, specialty, image }) => (
  <div className="col-md-4">
    <div className="team-card mb-5 shadow-sm rounded overflow-hidden">
      <img className="img-fluid rounded-top" src={image} alt={name} />
      <div className="team-desc p-3 text-center">
        <h4 className="mb-0">{name}</h4>
        <p className="mb-1 text-muted">{role}</p>
        <p className="mb-2 text-secondary small">{specialty}</p>
        
      </div>
    </div>
  </div>
);

const TeamSection = () => {
  return (
    <section id="gtco-team" className="bg-white section-padding">
      <div className="container">
        <div className="section-content">
          <div className="heading-section text-center mb-5">
            <span className="subheading">Specialties</span>
            <h2>Our Team</h2>
          </div>
          <div className="row">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                role={member.role}
                specialty={member.specialty}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
