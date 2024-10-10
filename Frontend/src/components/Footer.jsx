import Checkbox from "@mui/material/Checkbox";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-28 px-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Support Section */}
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Get help with a safety issue
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                AirCover
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Anti-discrimination
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Disability support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cancellation options
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Report neighborhood concern
              </a>
            </li>
          </ul>
        </div>

        {/* Hosting Section */}
        <div>
          <h3 className="font-bold mb-4">Hosting</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Airbnb your home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                AirCover for Hosts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hosting resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community forum
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hosting responsibly
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Airbnb-friendly apartments
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Join a free Hosting class
              </a>
            </li>
          </ul>
        </div>

        {/* Airbnb Section */}
        <div>
          <h3 className="font-bold mb-4">Airbnb</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Newsroom
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                New features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investors
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Gift cards
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Airbnb.org emergency stays
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t mt-8 pt-4 text-center text-xs">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <span>© 2024 Airbnb, Inc.</span>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Sitemap
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Your Privacy Choices
          </a>
          <Checkbox size="small" />
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            English (US)
          </a>
          <span>EGP</span>
          <a href="#">
            <Facebook sx={{ fontSize: "15px" }} />
          </a>
          <a href="#">
            <Twitter sx={{ fontSize: "15px" }} />
          </a>
          <a href="#">
            <Instagram sx={{ fontSize: "15px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
