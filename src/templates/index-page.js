import React from "react";
import PropTypes from "prop-types";
import { graphql } from 'gatsby';
import Layout from "../components/Layout";
import DashboardContent from "../components/DashboardContent";

const IndexPage = ({ data }) => {
  const players = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <DashboardContent players={players} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query playersQuery($skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "player" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            comments
            isAFK
            isToxic
            runsInGetsKilled
          }
        }
      }
    }
  }
`;
