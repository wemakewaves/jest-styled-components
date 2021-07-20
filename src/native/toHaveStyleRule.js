const { matcherTest, buildReturnMessage } = require('../utils');

function toHaveStyleRule(component, property, expected) {
  
  // https://github.com/styled-components/jest-styled-components/pull/337
  const styles = Array.isArray(component.props.style) ? component.props.style.filter((x) => x) : [component.props.style]

  /**
   * Convert style name to camel case (so we can compare)
   */
  const camelCasedProperty = property.replace(/-(\w)/, (_, match) => match.toUpperCase());

  /**
   * Merge all styles into one final style object and search for the desired
   * stylename against this object
   */
  const mergedStyles = styles.reduce((acc, item) => Object.assign({}, acc, item), {});
  const received = mergedStyles[camelCasedProperty];
  const pass = !received && !expected && this.isNot ? false : matcherTest(received, expected);

  return {
    pass,
    message: buildReturnMessage(this.utils, pass, property, received, expected),
  };
}

module.exports = toHaveStyleRule;
