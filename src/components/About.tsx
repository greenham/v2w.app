export function About() {
  return (
    <div className="fs-4">
      <p>
        <strong>v2w.app</strong> is a free volume to weight converter for the
        kitchen.
      </p>
      <p>
        It uses{" "}
        <a
          href="http://blog.khymos.org/wp-content/2014/01/volume-weight-conversion-v2.xlsm"
          target="_blank"
          rel="noopener noreferrer"
        >
          known densities
        </a>{" "}
        of specific ingredients to calculate the weight of a given volume of
        that ingredient.
      </p>
      <p>
        Other sites/apps don't take this data into account and simply give you a
        static conversion.
      </p>
      <p>
        It was{" "}
        <a
          href="https://github.com/greenham/volume2weight"
          target="_blank"
          rel="noopener noreferrer"
        >
          originally built
        </a>{" "}
        in April of 2014 with jQuery 😱 and upgraded to a React app 🥱 in
        December of 2023. The source code{" "}
        <a
          href="https://github.com/greenham/v2w.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          can be found here on GitHub
        </a>
        .
      </p>
    </div>
  );
}
