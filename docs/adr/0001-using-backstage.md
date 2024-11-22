# Adoption of an Internal Developer Platform: Backstage vs. Port.io vs. OpsLevel

## Context and Problem Statement

Our development teams are experiencing challenges due to a fragmented information landscape and varying levels of knowledge about our infrastructure, workflows, and secrets. This leads to inefficiencies, dependencies on DevOps for routine tasks, and difficulties in maintaining standards across projects. We need a solution that centralizes information, streamlines workflows, and empowers developers to focus on delivering business value.

## Decision Drivers

- Need for a single point of entry for developers interacting with the platform.
- Desire to standardize and streamline project configurations and workflows.
- Requirement to reduce dependencies on DevOps for routine operations.
- Aim to improve developer productivity and reduce cognitive overload.
- Preference for a solution that integrates with existing tools and can be customized to our needs.

## Considered Options

- **Option 1:** Implement **Backstage** as our Internal Developer Platform.
- **Option 2:** Adopt **Port.io** as our Internal Developer Platform.
- **Option 3:** Use **OpsLevel** to manage our developer operations.
- **Option 4:** Continue with the current setup and processes (status quo).
- **Option 5:** Develop a custom internal platform from scratch.

## Decision Outcome

Chosen option: **Implement Backstage as our Internal Developer Platform**, because it provides a flexible, open-source framework that addresses our current challenges by centralizing information, supporting customization, and integrating with our existing tools and workflows.

### Positive Consequences

- Centralization of project information through the Software Catalog.
- Improved onboarding processes using Software Templates.
- Enhanced documentation with TechDocs for better knowledge sharing.
- Reduced dependencies on DevOps by enabling self-service operations.
- Access to a wide range of community-supported plugins for extended functionality.

### Negative Consequences

- Requires initial setup and customization effort.
- Learning curve associated with adopting a new platform.
- Ongoing maintenance and updates to keep the platform current.

#### Mitigating circumstances
- A fair amount of documentation and community support available to assist with the setup and customization.
- @Ryangr0 has already set up a local instance of Backstage and is familiar with the platform


## Pros and Cons of the Options

### **Option 1: Implement Backstage**

**Description:** Adopt Backstage, an open-source Internal Developer Platform framework by Spotify, to centralize information and streamline developer workflows.

**Pros:**

- **Open Source and Customizable:** Being open-source, Backstage allows us to tailor the platform to our specific needs without licensing costs.
- **Plugin Ecosystem:** Access to numerous community-supported plugins (e.g., GitHub Actions, Sentry, Grafana) for extended functionality.
- **Active Community:** A strong community contributes to continuous improvement and support.
- **Flexible Integration:** Can integrate with our existing tools and infrastructure seamlessly.

**Cons:**

- **Initial Setup Effort:** Requires significant initial setup and customization.
- **Maintenance Responsibility:** We are responsible for ongoing maintenance and updates.
- **Learning Curve:** Team members will need to invest time to learn and adapt to the new platform.

### **Option 2: Adopt Port.io**

**Description:** Use Port.io, a platform that offers a developer portal and infrastructure management tools to centralize services and workflows.

**Pros:**

- **Feature-Rich Platform:** Provides a comprehensive set of tools out-of-the-box for service cataloging, environment management, and workflow automation.
- **User-Friendly Interface:** Designed for ease of use with a focus on user experience.
- **Managed Service:** Less overhead in terms of maintenance and updates compared to self-hosted solutions.

**Cons:**

- **Cost:** Licensing fees may be significant, especially as the team grows.
- **Less Customizable:** May not offer the same level of customization as an open-source solution.
- **Vendor Lock-In:** Dependence on a third-party provider for features and updates.

### **Option 3: Use OpsLevel**

**Description:** Leverage OpsLevel, a microservice catalog and developer portal aimed at helping teams manage service ownership and compliance.

**Pros:**

- **Service Ownership Management:** Strong focus on microservice ownership and best practices.
- **Integration Capabilities:** Supports integration with many popular tools and platforms.
- **Compliance Tracking:** Offers features to ensure services meet organizational standards.

**Cons:**

- **Cost:** Subscription fees could be substantial over time.
- **Limited Customization:** May not fully align with our unique workflows and processes.
- **Learning Curve:** Teams may need to adjust existing workflows to fit the platform's model.

### **Option 4: Continue with Current Setup**

**Description:** Maintain the existing processes and tools without significant changes.

**Pros:**

- **No Immediate Effort:** No additional setup or training required.
- **Familiarity:** Teams continue using tools and processes they are accustomed to.

**Cons:**

- **Inefficiencies Persist:** Fragmented information and dependencies on DevOps remain unaddressed.
- **Scalability Issues:** Challenges may become more pronounced as the organization grows.
- **Lack of Standardization:** Divergence in standards and infrastructure solutions across teams continues.

### **Option 5: Develop a Custom Platform**

**Description:** Build a bespoke internal platform tailored to our specific needs from scratch.

**Pros:**

- **Fully Tailored Solution:** Platform can be designed to meet all unique requirements.
- **Complete Control:** Full ownership over features and functionalities.

**Cons:**

- **High Resource Investment:** Significant time and development effort required.
- **Maintenance Burden:** Ongoing responsibility for updates, bug fixes, and enhancements.
- **Delayed Benefits:** Longer time to realize advantages compared to adopting an existing solution.

## Detailed Analysis

### Backstage vs. Port.io vs. OpsLevel

#### **Customization and Flexibility**

- **Backstage:** Highly customizable due to its open-source nature; we can modify and extend it to fit our exact needs.
- **Port.io and OpsLevel:** Offer customization but within the constraints of their platforms; may not accommodate all specific requirements.

#### **Cost Considerations**

- **Backstage:** No licensing fees; however, there is a cost in terms of time and resources for setup and maintenance.
- **Port.io and OpsLevel:** Subscription-based models that incur ongoing licensing costs, which can increase with team size and usage.

#### **Community and Support**

- **Backstage:** Backed by a strong open-source community with regular contributions and updates.
- **Port.io and OpsLevel:** Provide professional support as part of their services but may have slower feature development cycles based on their product roadmaps.

#### **Integration with Existing Tools**

- **Backstage:** Wide range of plugins and the ability to develop custom plugins for seamless integration with our tools.
- **Port.io and OpsLevel:** Support integrations but may not cover all the tools we use or require custom development within their platforms.

#### **Maintenance and Updates**

- **Backstage:** We are responsible for maintaining and updating the platform, which gives us control but also adds overhead.
- **Port.io and OpsLevel:** Maintenance and updates are handled by the providers, reducing our operational burden.

#### **Vendor Lock-In Risks**

- **Backstage:** Being open-source, there's no vendor lock-in; we can modify or migrate as needed.
- **Port.io and OpsLevel:** Potential for vendor lock-in, making future migrations more complex.

## Conclusion

After evaluating the options, **Backstage** emerges as the most suitable choice for our organization. Its open-source nature provides the flexibility and control we need to address our current challenges effectively. While it requires an initial investment in setup and learning, the long-term benefits of customization, community support, and avoidance of vendor lock-in align well with our strategic goals.

## Links

- [Backstage Official Documentation](https://backstage.io/)
- [Port.io Website](https://port.io/)
- [OpsLevel Website](https://www.opslevel.com/)
- [MADR Documentation](https://adr.github.io/madr/)

## Short Summary

We have decided to adopt **Backstage** as our Internal Developer Platform after comparing it with **Port.io** and **OpsLevel**. Backstage offers the customization, flexibility, and integration capabilities we require, without the ongoing licensing costs associated with proprietary platforms. This decision aligns with our goals to centralize information, empower our developers, and maintain control over our development environment.
