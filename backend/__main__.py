import argparse

from router import create_app


def arg_parser():
    parser = argparse.ArgumentParser(description="Run the Flask app")
    parser.add_argument(
        "-p",
        "--port",
        type=int,
        default=3000,
        help="Port to run the app on (default 3000)",
    )
    parser.add_argument(
        "-d",
        "--dev_mode",
        action="store_true",
        help="Run the app in development mode",
    )
    return parser.parse_args()


def main():
    args = arg_parser()
    create_app(port=args.port, dev_mode=args.dev_mode)


if __name__ == "__main__":
    main()
